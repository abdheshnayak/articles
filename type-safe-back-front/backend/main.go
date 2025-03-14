package main

import (
	"log"

	"example/todoapp/app/domain"
	"example/todoapp/app/entities"
	"example/todoapp/app/routes"
	"example/todoapp/env"
	"example/todoapp/pkg/logging"
	"example/todoapp/pkg/pgdb"
)

func main() {
	if err := Run(); err != nil {
		log.Fatal(err)
	}

	logging.Get().Info("Clean Exit")
}

func Run() error {
	e := env.GetEnvOrDie()
	db, err := pgdb.NewDb(e.DSN)

	if err != nil {
		return err
	}

	if err := entities.AutoMigrate(db); err != nil {
		return err
	}

	return routes.Graphql(domain.New(db, e), e)
}
