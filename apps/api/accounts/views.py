from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .serializers import (
    BusinessProfileSerializer,
    ExpertProfileSerializer,
    UserLoginSerializer,
    UserRegistrationSerializer,
    UserSerializer,
)


@api_view(["POST"])
def register(request):
    try:
        user_serializer = UserRegistrationSerializer(data=request.data)
        role = request.data.get("role")
        if not user_serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "message": "Invalid user data",
                    "errors": user_serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if role == "business":
            business_profile_serializer = BusinessProfileSerializer(data=request.data)
            if not business_profile_serializer.is_valid():
                return Response(
                    {
                        "success": False,
                        "message": "Invalid business profile data",
                        "errors": business_profile_serializer.errors,
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            user = user_serializer.save()
            business_profile_serializer.save(user=user)
            return Response(
                {
                    "success": True,
                    "message": "User created successfully",
                },
                status=status.HTTP_201_CREATED,
            )

        if role == "expert":
            expert_profile_serializer = ExpertProfileSerializer(data=request.data)
            if not expert_profile_serializer.is_valid():
                return Response(
                    {
                        "success": False,
                        "message": "Invalid expert profile data",
                        "errors": expert_profile_serializer.errors,
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            user = user_serializer.save()
            expert_profile_serializer.save(user=user)
            return Response(
                {
                    "success": True,
                    "message": "User created successfully",
                },
                status=status.HTTP_201_CREATED,
            )

    except Exception as e:
        return Response(
            {"success": False, "message": "Internal server error", "errors": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
def login(request):
    try:
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            password = serializer.validated_data["password"]
            email = serializer.validated_data["email"]
            try:
                user = User.objects.get(email=email)
                if user.check_password(password):
                    refresh = RefreshToken.for_user(user)
                    return Response(
                        {
                            "success": True,
                            "message": "Login successful",
                            "data": str(refresh.access_token),
                        }
                    )
                return Response(
                    {
                        "success": False,
                        "message": "Incorrect password",
                    },
                    status=status.HTTP_401_UNAUTHORIZED,
                )
            except User.DoesNotExist:
                return Response(
                    {
                        "success": False,
                        "message": "Incorrect email or user does not exist",
                    },
                    status=status.HTTP_401_UNAUTHORIZED,
                )

    except Exception as e:
        return Response(
            {"success": False, "message": "Internal server error", "errors": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    try:
        user = request.user
        serializedUser = UserSerializer(user)
        return Response(
            {
                "success": True,
                "message": "Successfully fetched user data",
                "data": serializedUser.data,
            },
            status=status.HTTP_200_OK,
        )
    except Exception as e:
        return Response(
            {"success": False, "error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
