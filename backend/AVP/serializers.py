from rest_framework import serializers
from .models import NewUser
from django.contrib import auth
class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    user_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = NewUser
        fields = ('password','email','first_name','user_name','is_staff','is_active','street_address','city','state','Pin_Code','contact')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):

        password = validated_data.pop('password', None)
        email=validated_data['email'],
        username=validated_data['user_name']
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
class ProfileSerializers(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        fields = ('email','first_name','user_name','is_staff','is_active','street_address','city','state','Pin_Code','contact')