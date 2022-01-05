"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import MyTokenObtainPairView,BlacklistTokenUpdateView,CustomUserCreate,ProfileView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
urlpatterns = [
    path('api/login/',MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/tokenrefresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    path('api/logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist'),
    path('profiledetails/<str:user_name>', ProfileView.as_view(),
         name='blacklist')
]
