package main

import (
	"acorneo/messenger/utils"
	"log"
)

func main() {
	db, err := utils.InitDatabase()
	if err != nil {
		log.Fatal(err)
	}
	utils.GiveInstance(db)

	defer db.Close()

	utils.CreateUser("Maksim", "1212", "jopa@jopa.com")
}
