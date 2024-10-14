package main

import (
	"acorneo/messenger/api"
	"acorneo/messenger/api/routes"
	"acorneo/messenger/utils"
	"log"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
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

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
	}))
	e.Use(middleware.Logger())

	api.InitializeRoutes(e)
	e.Logger.Fatal(e.Start(":8080"))
}
