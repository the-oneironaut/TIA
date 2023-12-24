from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('contact-enquiries', views.CreateContactEnquiryView.as_view(), name='create_contact_enquiry'),
]