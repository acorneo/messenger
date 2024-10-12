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

	defer db.Close()

}
