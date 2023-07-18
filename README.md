make sure download fe-blog

services:
  fe-blog:
    build: 
      context: fe-blog
      dockerfile: Dockerfile
    ports:
      - 3000:3000
    stdin_open: true
    restart: always
    environment:
      REACT_APP_HOST_DEV: http://localhost:9000/api/v1
      REACT_APP_HOST_IMAGE_DEV: http://localhost:9000/
    depends_on:
      - server-blog

    networks:
      - app-network

  server-blog:
    restart: always
    build: 
      context: server-blog
      dockerfile: Dockerfile
    depends_on:
      - mongo    
    ports:
      - 9000:9000
    environment:
      PORT : 9000
      URL_MONGODB_DEV : mongodb://mongo:27017/'your database name'

      JWT_SECRET_KEY: JWT_SECRET_KEY
      JWT_EXPIRATION : 2000h
      JWT_SECRET_KEY_REFRESH_TOKEN: JWT_SECRET_KEY_REFRESH_TOKEN
      JWT_EXPIRATION_REFRESH_TOKEN : 2000h
      GMAIL : 'your gmail'
      PASSWORD: 'your password'
      <!-- btw this isnt your gmail password, to get that password you can go to your google account and search app password and type nodemailer for getting notifications to users -->
    networks:
      - app-network
    
  
  mongo:
    restart: always
    image: mongo:latest
    volumes:
      - mongo:/data/db
    expose:
      - "27017:27017"
    networks:
      - app-network

networks:
  app-network:
    driver: bridge





volumes:
  mongo: {}
