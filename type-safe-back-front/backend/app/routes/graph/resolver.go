package graph

import "example/todoapp/app/domain"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	Domain domain.Domain
}
