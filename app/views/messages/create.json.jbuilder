json.content @message.content
json.user_id @message.user_id
json.name @message.user.name
json.image_url @message.image.url
json.(@message, :content, :image)
json.created_at @message.created_at
json.user_name @message.user.name
json.id @message.id