package api

import (
	"acorneo/messenger/api/routes"

	"github.com/labstack/echo/v4"
)

func InitializeRoutes(e *echo.Echo) {
	e.GET("api/ping", echo.HandlerFunc(routes.Ping))
	e.POST("api/register", echo.HandlerFunc(routes.Register))
	e.POST("api/login", echo.HandlerFunc(routes.Login))
}
