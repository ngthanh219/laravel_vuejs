## Installation

1. PHP version 8.1

2. Laravel 9
```sh
- composer require aws/aws-sdk-php -W
- composer require league/flysystem-aws-s3-v3 -W
```

3. Vue 3
```sh
- composer require laravel/ui
- php artisan ui vue
- npm install
- npm install webpack --save
- npm install laravel-mix
- npm install vue@next vue-loader@next
- npm install @vitejs/plugin-vue
- npm install vue-router
- npm run dev
```

## Build

1. Install composer *
```sh
composer install
```

2. Create .env file *
```sh
cp .env.example .env
```

3. Change .env file's information *

4. Create key for app in .env file
```sh
php artisan key:generate
```

5. Create migrataion *
```sh
php artisan migrate
```

6. Seeder sample data
```sh
php artisan db:seed
```

7. Install npm *
```sh
npm install
```

8. Start server
```sh
php artisan serve
```

9. Start npm
- Development
```sh
npm run dev
```

- Production
```sh
npm run build
```