package utils

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

var db *sql.DB

func GiveInstance(instance *sql.DB) {
	db = instance
}

func InitDatabase() (*sql.DB, error) {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("[database.go] Error loading .env file.")
	}

	db_username := os.Getenv("DB_USER")
	db_name := os.Getenv("DB_NAME")
	db_password := os.Getenv("DB_PASSWORD")

	connStr := fmt.Sprintf("user=%s dbname=%s password=%s sslmode=disabled", db_username, db_name, db_password)
	db, err := sql.Open("postgres", connStr)

	if err != nil {
		log.Fatal("[database.go] Error connection to the database.")
		return nil, err
	}

	if err = db.Ping(); err != nil {
		log.Fatal("[database.go] Error pinging database, even connection was established.")
		return nil, err
	}

	return db, nil
}

func CreateUser(username string, password string, email string) error {
	hashedPassword, err := HashPassword(password)
	if err != nil {
		log.Fatalf("[database.go] Something went wrong while generation password hash for user %s", username)
		return err
	}

	statement, err := db.Prepare("INSERT INTO users (username, password_hash, email) VALUES($1, $2, $3)")
	if err != nil {

	}
}
