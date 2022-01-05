from django.shortcuts import render
# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework import TokenAuthentication
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status,views
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status,views
from rest_framework.permissions import AllowAny
from rest_framework import viewsets, filters, generics, permissions
from .models import NewUser
from .serializers import CustomUserSerializer,ProfileSerializers
##
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # authentication_classes = [TokenAuthentication]
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['email']=self.user.email
        data['user_name']=self.user.user_name
        return data
class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
class CustomUserCreate(APIView):
    permission_classes = [AllowAny]
    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class ProfileView(generics.ListAPIView):
    serializer_class = ProfileSerializers
    def get_queryset(self,**kwargs):
        username=self.kwargs.get('user_name')
        User=NewUser.objects.filter(user_name=username)
        return User