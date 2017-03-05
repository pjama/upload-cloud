# Cloud Upload

Example project creates a Node.js server that accepts file upload (POST requests). The uploaded file saves to a cloud storage (IaaS) provider.

## Google Cloud Storage

[Initial setup](https://cloud.google.com/appengine/docs/flexible/nodejs/using-cloud-storage):

Make sure you create a Cloud Storage bucket for your application by invoking the following command:

```bash
gsutil mb gs://[your-bucket-name]
```

And make it publicly readable so it can serve files:

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

![Screenshot Google Cloud](/screenshot-gcloud.png)

## Amazon Web Services S3

Using [AWS CLI](https://github.com/aws/aws-cli),

```bash
aws s3api create-bucket --bucket [your-bucket-name]
```

1. Configure AWS via either a) [command line](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html), or b) [JSON](http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-json-file.html) config file

#### Command line

Run the _configure_ command

```bash
aws configure
```

Specify AWS IAM credentials:

* AWS Access Key ID (_XXXXXXXXXXXXXXXXXXX_),
* AWS Secret Access Key (_wJalrXUtnFEMI/K7MDENG/bPxRyyyEXAMPLEKEY_)
* Default region name (_us-west-2_)
* Default output format (_json_)

#### JSON Config

```json
{
  "accessKeyId": "YOUR_ACCESS_KEY_ID",
  "secretAccessKey": "YOUR_SECRET_ACCESS_KEY",
  "region": "us-west-2"
}
```

Use the following command in Node.js:

```javascript
AWS.config.loadFromPath('./config.json');
```

2. Run Node.js server

Specifying the Bucket as an environment variable

```bash
AWS_S3_BUCKET=[your-bucket-name] node index.js
```

3. Test using `curl`,

```bash
    curl -F "file=@/Users/..." localhost:8080/upload
```

![Screenshot AWS](/screenshot-aws.png)

## Notes - Signed URLS

Alternative approach: using signed links to upload directly from browser to cloud.

* [Google Cloud](https://cloud.google.com/storage/docs/access-control/signed-urls)
* [Amazon Web Services](https://devcenter.heroku.com/articles/s3-upload-node)
