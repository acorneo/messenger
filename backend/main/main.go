package main

import (
	"acorneo/messenger/api"
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
	routes.GiveKey()
	defer db.Close()

	e := echo.New()
	api.InitializeRoutes(e)
	e.Logger.Fatal(e.Start(":8080"))
}
