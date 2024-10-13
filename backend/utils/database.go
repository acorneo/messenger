package utils

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var db *sql.DB

func GiveInstance(instance *sql.DB) {
	db = instance
}

func InitDatabase() (*sql.DB, error) {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("[database.go] %s", err)
	}

	db_username := os.Getenv("DB_USER")
	db_name := os.Getenv("DB_NAME")
	db_password := os.Getenv("DB_PASSWORD")

	connStr := fmt.Sprintf("user=%s dbname=%s password=%s sslmode=disable", db_username, db_name, db_password)
	db, err := sql.Open("postgres", connStr)

	if err != nil {
		log.Fatalf("[database.go] %s", err)
		return nil, err
	}

	if err = db.Ping(); err != nil {
		log.Fatalf("[database.go] %s", err)
		return nil, err
	}

	return db, nil
}

func CreateUser(username string, password string, email string) error {
	hashedPassword, err := HashPassword(password)
	if err != nil {
		log.Printf("[database.go] %s", err)
		return err
	}

	statement, err := db.Prepare("INSERT INTO users (username, password_hash, email) VALUES($1, $2, $3)")
	if err != nil {
		log.Printf("[database.go] %s", err)
		return err
	}
	defer statement.Close()

	_, err = statement.Exec(username, hashedPassword, email)
	return err
}

type User struct {
	Username     string
	PasswordHash string
	Email        string
}

func GetUserByUsername(username string) (User, error) {
	var user User
	statement := "SELECT username, password_hash, email FROM users WHERE username=$1"
	err := db.QueryRow(statement, username).Scan(&user.Username, &user.PasswordHash, &user.Email)
	if err != nil {
		if err == sql.ErrNoRows {
			return user, nil
		}
		log.Printf("[database.go] %s", err)
		return user, err
	}
	return user, nil
}
