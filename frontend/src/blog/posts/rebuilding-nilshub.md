---
title: Rebuilding nilshub.se
date: 2026-10-16
summary: My personal site went from a logo with two buttons to a proper home for my projects, CV and writing. Here is how it is put together.
---

For a long time nilshub.se was a logo and two buttons. Now it has a start page, my
projects, a CV you can read without opening a PDF, a [now page](/now) and this blog.

## The setup

The site is React and TypeScript, built with Vite. There is no backend and no database:
everything is plain files that get bundled into static HTML, CSS and JavaScript.

All the text lives in a `data/` folder, separate from the layout. Updating my CV or adding
a project means editing a list, not touching any components.

## Writing posts in Markdown

Each post is a Markdown file in the repository. At build time Vite collects every file in
the posts folder, and the site turns them into pages. Publishing a post is a commit.

## Keeping it working

A GitHub Actions workflow runs the linter, checks the formatting and builds the site on
every push, so a broken change gets caught before it goes anywhere.
