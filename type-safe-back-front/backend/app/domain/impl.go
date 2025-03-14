package domain

import (
	"context"
	"fmt"

	"example/todoapp/app/entities"
	"example/todoapp/env"
	"gorm.io/gorm"
)

type domain struct {
	db  *gorm.DB
	env *env.Env
}

func (d *domain) AddTodo(ctx context.Context, todo *entities.Todo) (*entities.Todo, error) {
	result := d.db.Create(todo)
	if result.Error != nil {
		return nil, result.Error
	}

	return todo, nil
}

func (d *domain) DeleteTodo(ctx context.Context, id int) error {
	result := d.db.Delete(&entities.Todo{}, id)
	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return fmt.Errorf("no todo found with id %d", id)
	}

	return nil
}

func (d *domain) GetTodo(ctx context.Context, id int) (*entities.Todo, error) {

	var todo entities.Todo
	result := d.db.First(&todo, id)
	if result.Error != nil {
		return nil, result.Error
	}

	return &todo, nil
}

func (d *domain) ListTodos(ctx context.Context) ([]*entities.Todo, error) {
	var todos []*entities.Todo
	result := d.db.Find(&todos)
	if result.Error != nil {
		return nil, result.Error
	}

	return todos, nil
}

func (d *domain) UpdateTodo(ctx context.Context, id int, todo *entities.Todo) (*entities.Todo, error) {
	result := d.db.Save(todo)
	if result.Error != nil {
		return nil, result.Error
	}

	if result.RowsAffected == 0 {
		return nil, fmt.Errorf("no todo found with id %d", id)
	}

	return todo, nil
}
