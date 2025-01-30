# Airlines 

Bu sistem, `ADMIN` ve `USER` olmak üzere iki farklı kullanıcı rolünü destekler. `ADMIN` rolü default olarak yüklenir ve
uçuş planları oluşturma yetkisine sahipken, `USER` rolü uçuşları görüntüleyebilir , uçuş araması yapabilir.

## Teknolojiler

### Backend:

- **Java**: Spring Boot framework ile geliştirilmiştir.
- **JPA / Hibernate**: Veritabanı işlemleri için kullanılmıştır.
- **JWT**: Kullanıcı kimlik doğrulama işlemleri için kullanılmıştır.
- **PostgreSQL**: Veritabanı olarak PostgreSQL kullanılmıştır.
- **Docker**: Veritabanının Docker üzerinden çalışabilmesi için yapılandırılmıştır.

### Frontend:

- **ReactJS**: Kullanıcı arayüzü ReactJS ile geliştirilmiştir.
- **Axios**: API çağrıları için kullanılmıştır.

## Proje Özeti

Bu proje, kullanıcıların uçuş bilgilerini görüntülemesini ve aramasını sağlayan bir uçuş yönetim sistemidir.

### Admin:

- Bütün uçuş planlarını görüntüleyebilir.
- Yeni uçuş planları oluşturabilir.
- Mevcut uçuşu silebilir.
- Uçuş planlarını oluştururken, uçuşların kalkış ve iniş saatlerinin çakışmaması gerektiği kurallarını uygular.

### User:

- Kullanıcılar, isim, soyisim, şehir, kullanıcı adı ve şifre bilgileriyle kayıt olabilir.
- Kullanıcılar, sisteme giriş yaptıktan sonra uçuşları görüntüleyebilir.
- Kullanıcılar, kayıt oldukları şehirden kalkan uçuşları veya belirli kriterlere göre uçuş araması yaparak uçuşları
  görebilirler.

## Proje Kurulumu

### Backend Kurulumu

1. **PostgreSQL Docker Konfigürasyonu**:
   Backend projesi için PostgreSQL veritabanı Docker üzerinden çalıştırılacaktır. `docker-compose.yml` dosyasını
   kullanarak PostgreSQL servisini başlatabilirsiniz.

2. **Spring Boot Projesi**:
    - **Bağlantı Ayarları**: Backend uygulamanızda, PostgreSQL veritabanına bağlanmak için `application.yml`
      dosyasındaki şu ayarları kontrol edin:
      ```yaml
      spring:
        application:
          name: fill-your-desire
        datasource:
          hikari:
            driver-class-name: org.postgresql.Driver
          url: jdbc:postgresql://localhost:5434/database-name
          username: username
          password: password
        jpa:
          hibernate:
            ddl-auto: update
          database: postgresql
      ```

    - **Admin Kullanıcı Ayarları**: Admin kullanıcısının `username` ve `password` bilgilerini çevresel
      değişkenler (`environment variables`) olarak IDE üzerinden ayarlamalısınız:
      ```properties
      SPRING.ADMIN.USERNAME=admin
      SPRING.ADMIN.PASSWORD=password
      ```

    - **JWT Ayarları**: JWT için gizli anahtar ve geçerlilik süresi `application.yml` dosyasına aşağıdaki gibi
      eklenmiştir:
      ```yaml
      application:
        security:
          jwt:
            secret-key: 0
            expiration: 86400000
      ```

3. **API Bağlantısı**:
    - Backend API'leri için `/api/v1/` path'i kullanılacaktır.
    - API servisleri, uçuş bilgilerini almak ve yönetmek için RESTful bir mimariyle oluşturulmuştur.

# Flight Service REST API

Bu API, uçuş bilgilerini yönetmek için kullanılır. Aşağıdaki HTTP metotları ile uçuşları ekleyebilir, sorgulayabilir, ve
yönetebilirsiniz.

### Base URL: http://localhost:8080/api/v1/flights

### Endpointler:

| HTTP Method | Endpoint      | Açıklama                                                                             |
|-------------|---------------|--------------------------------------------------------------------------------------|
| **POST**    | `/`           | Yeni bir uçuş ekler.                                                                 |
| **GET**     | `/`           | Tüm uçuşları getirir (ADMIN yetkisi ile).                                            |
| **GET**     | `/findByCity` | Kullanıcıya bağlı olarak, bulunduğu şehirdeki uçuşları getirir.                      |
| **GET**     | `/search`     | Kullanıcıya bağlı olarak, gün , kalkış ve varış şehirlerine göre uçuş araması yapar. |
| **DELETE**  | `/{id}`       | Belirli bir uçuşu siler (ADMIN yetkisi ile).                                         |

# User Service REST API
Bu API, kullanıcıların kayıt olmasını, giriş yapmasını ve doğrulama işlemlerini yönetir.

Base URL:
http://localhost:8080/api/v1/auth

| HTTP Method | Endpoint       | Açıklama                                |
|-------------|----------------|-----------------------------------------|
| **POST**    | `/register`    | Yeni bir kullanıcı kaydeder.            |
| **POST**    | `/login`       | Kullanıcıyı sisteme giriş yaptırır.     |
| **GET**     | `/admin/check` | ADMIN yetkisi ile kullanıcıyı doğrular. |
| **GET**     | `/user/check`  | USER yetkisi ile kullanıcıyı doğrular.  |


Example Register's request
```

{
  "firstName": "name",
  "lastName": "lastname",
  "locatedCity": "istanbul",
  "username": "username",
  "password": "password"
}


```

### Frontend Kurulumu

1. **React Projesi**:
   Frontend, ReactJS kullanılarak geliştirilmiştir. Base Componentler (Input, Button , Select , Datepicker , Checkbox ) oluşturulmuştur.

2. **Axios Kullanımı**:
   API çağrıları yapmak için Axios kullanılmıştır. React bileşenlerinden API'lere veri gönderilmekte ve alınmaktadır.

## Kullanıcı İşlemleri

### Kayıt (Signup):

- Kullanıcılar, ad, soyad, şehir, kullanıcı adı ve şifre bilgilerini girerek sisteme kayıt olurlar.

### Giriş (Login):

- Kullanıcılar, kullanıcı adı ve şifre ile giriş yaparak sisteme erişim sağlarlar.Backend tarafına login işlemi sonrası bir istek gider.
  Kullanıcının `USER` olup olmadığı backend tarafında doğrulanır.Eğer kullanıcı bir `USER` ise , '/home' sayfasına yönlendirilir. 

### Anasayfa:

- Kullanıcıların kaydettikleri şehir bilgisiyle uçuşlar listelenir.
- Uçuş araması yapılabilir; bu arama kriterleri kalkış yeri, varış yeri ve uçuş gününü içerir.

### Admin Sayfası:

- Admin kullanıcıları, mevcut uçuş planlarını görebilir.
- Yeni uçuş planları oluşturabilirler.
- Uçuş planları oluşturulurken, uçuş saatleri arasındaki 30 dakikalık çakışma kontrolü yapılır.
- Kullanıcının `ADMIN` olup olmadığı backend'e gönderilen istekle öğrenilmektedir.Eğer giriş yapan `ADMIN` kullanıcısıysa '/admin'
  sayfasına yönlendirilir.

## Docker Kullanımı

 PostgreSQL veritabanı, Docker-compose ile başlatılabilir. Aşağıda, veritabanını
Docker üzerinde çalıştırmak için kullanılacak `docker-compose.yml` örneği bulunmaktadır:

```yaml
version: "3.8"
services:
  db:
    image: postgres:latest
    container_name: airlines-db
    environment:
      POSTGRES_USER: username
      POSTGRES_PASSWORD: password
      POSTGRES_DB: airlines
    ports:
      - "5432:5432"
    networks:
      - airlines-net
    volumes:
      - postgres-data:/var/lib/postgresql/data

networks:
  airlines-net:
    driver: bridge

volumes:
  postgres-data:

```
## Setup

### Backend project

İlk olarak, projeyi GitHub'dan klonlayın:
```bash
  git clone https://github.com/omerfarukkodat/airlines.git
  cd airlines
```

Maven kullanarak bağımlılıkları yüklemek için aşağıdaki komutu çalıştırın:
```bash
  mvn clean install
```

Proje dizininde airlines/airlines-be klasöründe docker-compose.yml dosyasını çalıştırın
```bash
  docker-compose up -d
```
Ardından Spring Boot projesini çalıştırın
```bash
mvn spring-boot:run
```

### For FrontEnd:

- Terminalde veya tercih ettiğiniz Editörde **airlines-fe** klasörüne gidin.

```bash
  npm start
```

Front end tarafını da başarıyla çalıştırdıktan sonra projeyi tarayıcıdan görebilirsiniz.




