json.content        @message.content
json.name           @message.user.name
json.image_url      @message.image.url
json.created_at     @message.created_at.strftime('%Y/%m/%d %H:%M:%S')
json.id             @message.id