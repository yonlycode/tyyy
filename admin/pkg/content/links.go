package content

import (
	"encoding/json"
	"errors"
	"time"
)

// Link is a single contact/social link shown on the site's contact (linktree) page.
// The order of links in LinksData.Links defines their display order on the site.
type Link struct {
	ID      string `json:"id"`
	Label   string `json:"label"`
	URL     string `json:"url"`
	Icon    string `json:"icon"`
	Enabled bool   `json:"enabled"`
}

// LinksData is the JSON shape of web/content/links.json, aligned with
// web/src/lib/links.ts.
type LinksData struct {
	Title    string `json:"title"`
	Subtitle string `json:"subtitle"`
	Links    []Link `json:"links"`
}

// Sentinel errors surfaced to the UI.
var (
	ErrLinksRequired = errors.New("link label and url are required")
)

// DefaultCommitMsg builds a conventional commit message for a links update.
func (l *LinksData) DefaultCommitMsg(action string) string {
	return "chore(admin): " + action + " contact links on " + time.Now().Format("2006-01-02")
}

// Validate ensures required link fields are present.
func (l *LinksData) Validate() error {
	for _, link := range l.Links {
		if link.Label == "" || link.URL == "" {
			return ErrLinksRequired
		}
	}
	return nil
}

// Render serializes the links data back to JSON (pretty-printed).
func (l *LinksData) Render() []byte {
	out, _ := json.MarshalIndent(l, "", "  ")
	return out
}
