# E-LEARNING - Setup Enviroment(Quick Guide)

### 1. Clone repository in your local

```
git clone git@github.com:framgia/sph-classroom-els-fe.git
```

_note: use ssh when you clone_


### 2. Build the docker container

```
docker-compose up -d --build
```

_note: if you want to see what's going on when it's building, just run `docker-compose logs -f`_

### 3. Visit the application in browser

```
http://localhost:3003
```

### 4. To run some commands for the application

```
docker-compose exec frontend <insert command>
```
