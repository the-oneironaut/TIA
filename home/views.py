from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import ContactEnquiries
from django.core.exceptions import ValidationError
import json
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.views import APIView
from rest_framework import serializers

def index(request):
    return render(request, 'index.html')

class ContactEnquiriesSerializer(serializers.ModelSerializer): 
    whatsapp_no = serializers.IntegerField(required=False, allow_null=True, default=0)
    animation_type = serializers.CharField(max_length=50, required=False)
    budget = serializers.IntegerField(required=False, allow_null=True, default=0)

    class Meta: 
        model = ContactEnquiries 
        fields = ['name', 'email', 'whatsapp_no', 'animation_type', 'budget', 'message']

class CreateContactEnquiryView(APIView):
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'name': openapi.Schema(type=openapi.TYPE_STRING, description='Name'),
                'email': openapi.Schema(type=openapi.TYPE_STRING, description='Email'),
                'whatsapp_no': openapi.Schema(type=openapi.TYPE_STRING, description='WhatsApp Number'),
                'animation_type': openapi.Schema(type=openapi.TYPE_STRING, description='Animation Type'),
                'budget': openapi.Schema(type=openapi.TYPE_NUMBER, description='Budget'),
                'message': openapi.Schema(type=openapi.TYPE_STRING, description='Message'),
            },
        ),
        responses={
            201: openapi.Response(description='Enquiry created successfully'),
            400: openapi.Response(description='Invalid data'),
            405: openapi.Response(description='Invalid method'),
        },
    )
    def post(self, request):
        print(request.data)
        serializer = ContactEnquiriesSerializer(data=request.data)
        if not serializer.is_valid():
            return JsonResponse({'status': 'error', 'errors': serializer.errors}, status=400)
        data = serializer.validated_data
        try:
            enquiry = ContactEnquiries(**data)
            enquiry.full_clean()
            enquiry.save()
            return JsonResponse({'status': 'success'}, status=201)
        except ValidationError as e:
            return JsonResponse({'status': 'error', 'errors': e.message_dict}, status=400)
        except Exception as e:
            return JsonResponse({'status': 'error', 'errors': str(e)}, status=400)