# NestNotes

Simple app for managing simple notes. Created for learning purposes. 

### Background

Recently, I realized that all the applications written in Express.js that I have
had to work with were terribly written—just one big spaghetti code mess. All the
logic, database queries, authentication, and other functionalities are crammed 
into bloated request handlers. It's painfull to watch and more painfull to work 
with. Perhaps there are well-written applications in Express.js somewhere, but 
I haven't been fortunate enough to come across them. (I do not say that there are
no well written applications in express.js at all :) )

That's why I decided to find some tool in TypeScript that would help me (and my 
colleagues) replace the outdated Express.js with something new and more structured, 
such as NestJS. Therefore, this is my first attempt with this toy application 
for creating an API.

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

- notes search
- notes categories and tags
- notes additional properties - "background color", "pinned"
- handle file uploads
