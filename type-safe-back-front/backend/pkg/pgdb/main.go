package pgdb

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"example/todoapp/pkg/logging"
)

// dsn => data source name

func NewDb(dsn string) (*gorm.DB, error) {
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		return nil, err
	}

	logging.Get().Info("Successfully Connected To Db")
	return db, err
}
