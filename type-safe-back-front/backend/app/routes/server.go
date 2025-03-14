package routes

import (
	"fmt"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"example/todoapp/app/domain"
	"example/todoapp/app/routes/graph"
	generated "example/todoapp/app/routes/graph/generated"
	"example/todoapp/env"
	"example/todoapp/pkg/logging"
	"github.com/vektah/gqlparser/v2/ast"
)

func Graphql(d domain.Domain, ev *env.Env) error {

	srv := handler.New(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{
		Domain: d,
	}}))

	srv.AddTransport(transport.Options{})
	srv.AddTransport(transport.GET{})
	srv.AddTransport(transport.POST{})

	srv.SetQueryCache(lru.New[*ast.QueryDocument](1000))

	srv.Use(extension.Introspection{})
	srv.Use(extension.AutomaticPersistedQuery{
		Cache: lru.New[string](100),
	})

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	logging.Get().Info(fmt.Sprintf("connect to http://localhost:%d/ for GraphQL playground", ev.PORT))
	return http.ListenAndServe(fmt.Sprintf(":%d", ev.PORT), nil)
}
