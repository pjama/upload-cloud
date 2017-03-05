# Cloud Upload

Example project creates a Node.js server that accepts file upload (POST requests). The uploaded file saves to a cloud storage (IaaS) provider.

## Google Cloud Storage

[Initial setup](https://cloud.google.com/appengine/docs/flexible/nodejs/using-cloud-storage):

Make sure you create a Cloud Storage bucket for your application by invoking the following command:

```bash
gsutil mb gs://[your-bucket-name]
```

And make it publically readable so it can serve files:

```bash
gsutil defacl set public-read gs://[your-bucket-name]
```

#### Running the server

1. Log in with `gcloud` account

```bash
gcloud auth application-default login
```

2. Run Node.js server

Specifying the Bucket as an environment variable

```bash
GCLOUD_STORAGE_BUCKET=[your-bucket-name] node index.js
```

3. Test using `curl`,

```bash
    curl -F "file=@/Users/..." localhost:8080/upload
```
