package entities

import "gorm.io/gorm"

type Todo struct {
	gorm.Model `graphql:"noinput"`
	Title      string `json:"title"`
	Done       bool   `json:"done"`
}
