package routes

import (
	"acorneo/messenger/utils"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
)

var jwtKey string

func GiveKey() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("[login.go] Error loading .env file: %s", err)
	}
	jwtKey = os.Getenv("JWT_SECRET")
	if jwtKey == "" {
		log.Fatalf("[login.go] JWT_SECRET not set in .env file")
	}
}

type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

func Login(c echo.Context) error {
	json_map := make(map[string]interface{})
	err := json.NewDecoder(c.Request().Body).Decode(&json_map)
	if err != nil {
		return err
	} else {
		username := json_map["username"].(string)
		password := json_map["password"].(string)

		usr, err := utils.GetUserByUsername(username)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"message": "error occurred"})
		}
		if !utils.CheckPasswordWithHash(password, usr.PasswordHash) {
			return c.JSON(http.StatusUnauthorized, map[string]string{"message": "Invalid credentials"})
		}

		expirationTime := time.Now().Add(24 * time.Hour)
		claims := &Claims{
			Username: username,
			StandardClaims: jwt.StandardClaims{
				ExpiresAt: expirationTime.Unix(),
			},
		}

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		tokenString, err := token.SignedString([]byte(jwtKey))
		if err != nil {
			log.Printf("[login.go] Error signing token: %s", err)
			return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Could not generate token"})
		}

		c.SetCookie(&http.Cookie{
			Name:     "token",
			Value:    tokenString,
			Expires:  expirationTime,
			HttpOnly: true,
		})

		return c.JSON(http.StatusOK, map[string]string{"message": "Login successful"})
	}
}
