package logging

import (
	"log/slog"
	"os"
	"sync"

	"github.com/golang-cz/devslog"
)

var instance *slog.Logger
var once sync.Once

// singleton Function
func Get() *slog.Logger {
	once.Do(func() {
		s := os.Getenv("MODE")
		if s == "" {
			s = "development"
		}

		switch s {
		case "development":
			instance = slog.New(devslog.NewHandler(os.Stdout, nil))
		case "production":
			instance = slog.New(slog.NewJSONHandler(os.Stdout, nil))
		}

	})

	return instance
}
