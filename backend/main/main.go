package main

import (
	"acorneo/messenger/api/routes"
	"acorneo/messenger/utils"
	"log"

	"github.com/labstack/echo/v4"
)

func main() {
	db, err := utils.InitDatabase()
	if err != nil {
		log.Fatal(err)
	}
	utils.GiveInstance(db)
	defer db.Close()

	e := echo.New()
	routes.InitializeRoutes(e)
	e.Logger.Fatal(e.Start(":8080"))
}
