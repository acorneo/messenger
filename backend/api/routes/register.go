package routes

import (
	"acorneo/messenger/utils"
	"encoding/json"
	"net/http"

	"github.com/labstack/echo/v4"
)

func Register(c echo.Context) error {
	json_map := make(map[string]interface{})
	err := json.NewDecoder(c.Request().Body).Decode(&json_map)
	if err != nil {
		return err
	} else {
		username := json_map["username"].(string)
		password := json_map["password"].(string)
		email := json_map["email"].(string)
		err := utils.CreateUser(username, password, email)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"message:": "Registration failed"})
		}
		return c.JSON(http.StatusOK, map[string]string{"message": "Registration successful"})
	}
}
