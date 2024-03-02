# NestNotes

Simple app for managing simple notes. Created for learning purposes. 

## Start

```bash
cp ./backend/.env.example ./backend/.env
# optional but recomended: update SECRET string 

make start
```

This command will start 3 services defined in `docker-compose.yml` - postgres, 
backend and frontend. Frontend is written in Angular, build process described 
in `./frontend/Dockerfile`. Compilled bundle served by `nginx` layer with config
located in `./config/nginx/default.conf`. Requests to backend are proxied by 
nginx.

Backend has 2 models - User and Note. Each user can have multiple notes.


### TODO

This app requires a few features that I'll be adding later:

- [] notes search
- [] notes categories and tags
- [] notes additional properties - "background color", "pinned"
- [] handle file uploads
- [] NestJS cache
- [] ngrx on fronend ( for disabling spaning requests on )
