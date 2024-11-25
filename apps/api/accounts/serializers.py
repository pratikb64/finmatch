from rest_framework import serializers

from .models import BusinessProfile, ExpertProfile, User


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email", "password", "role")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


class BusinessProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessProfile
        fields = [
            "name",
            "industry",
            "description",
        ]


class ExpertProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpertProfile
        fields = [
            "id",
            "first_name",
            "last_name",
            "phone",
            "specializations",
            "certifications",
            "address_street",
            "address_city",
            "address_state",
            "address_zip",
        ]


class UserSerializer(serializers.ModelSerializer):
    business_profile = BusinessProfileSerializer(required=False)
    expert_profile = ExpertProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ["id", "email", "role", "business_profile", "expert_profile"]
