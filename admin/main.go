package main

import (
	"embed"

	"github.com/wailsapp/wails/v3/pkg/application"

	"admin/pkg/app"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	a := app.NewApp()

	app := application.New(application.Options{
		Name:  "yo-port admin",
		Assets: application.AssetOptions{
			Handler: application.AssetFileServerFS(assets),
		},
		Services: []application.Service{
			application.NewService(a),
		},
		Mac: application.MacOptions{
			ApplicationShouldTerminateAfterLastWindowClosed: true,
		},
	})

	app.Window.NewWithOptions(application.WebviewWindowOptions{
		Title:            "yo-port admin",
		Width:            1200,
		Height:           820,
		BackgroundColour: application.NewRGB(15, 17, 21),
	})

	app.Run()
}
