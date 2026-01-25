import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const s3Client = new S3Client({
    region: process.env.S3_REGION || "ap-south-1",
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
    },
});

export const S3_BUCKET_NAME = process.env.S3_BUCKET || "";

export async function getPresignedVideoUrl(objectKey: string) {
    if (!S3_BUCKET_NAME) return null;

    try {
        const command = new GetObjectCommand({
            Bucket: S3_BUCKET_NAME,
            Key: objectKey,
        });

        // URL valid for 1 hour
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        return url;
    } catch (error) {
        console.error("Error generating presigned GET URL:", error);
        return null;
    }
}
