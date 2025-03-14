package entities

import (
	"example/todoapp/pkg/logging"
	"gorm.io/gorm"
)

func AutoMigrate(db *gorm.DB) error {
	if err := db.AutoMigrate(&Todo{}); err != nil {
		return err
	}

	logging.Get().Info("auto migrate done")
	return nil
}
