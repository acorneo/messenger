package routes

import (
	"github.com/labstack/echo/v4"
)

func InitializeRoutes(e *echo.Echo) {
	e.GET("api/ping", echo.HandlerFunc(Ping))
}
