package domain

import (
	"context"

	"example/todoapp/app/entities"
	"example/todoapp/env"
	"gorm.io/gorm"
)

type Domain interface {
	AddTodo(ctx context.Context, todo *entities.Todo) (*entities.Todo, error)
	ListTodos(ctx context.Context) ([]*entities.Todo, error)
	GetTodo(ctx context.Context, id int) (*entities.Todo, error)
	UpdateTodo(ctx context.Context, id int, todo *entities.Todo) (*entities.Todo, error)
	DeleteTodo(ctx context.Context, id int) error
}

func New(db *gorm.DB, ev *env.Env) Domain {
	return &domain{
		db:  db,
		env: ev,
	}
}
