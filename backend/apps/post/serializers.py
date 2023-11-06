from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    author_image = serializers.ReadOnlyField(source='author.image.url')
    author_id = serializers.ReadOnlyField(source='author.id')
    likes = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = '__all__'