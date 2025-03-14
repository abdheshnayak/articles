package env

import (
	"log"

	ev "github.com/codingconcepts/env"
)

type Env struct {
	DSN  string `env:"DSN" required:"true"`
	PORT int    `env:"PORT" default:"8080"`
}

func GetEnvOrDie() *Env {
	var e Env

	if err := ev.Set(&e); err != nil {
		log.Fatal(err)
	}

	return &e
}
