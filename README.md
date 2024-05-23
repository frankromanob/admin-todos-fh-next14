# Development
Pasos para levantar la app en desarrollo

1. Levantar la base de datos
```
docker compose upp -d
```

2. Renombrar el .env.template a .env
3. Reemplazar las variables de entorno
4. Ejecutar el [api/seed](http://localhost:3000/api/seed) para poblar la DB local

# Prisma
```
npx prisma init

npx prisma migrate dev

npx prisma generate
```