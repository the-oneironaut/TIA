from django.db import models

class ContactEnquiries(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    whatsapp_no = models.BigIntegerField(max_length=15)
    animation_type = models.CharField(max_length=100)
    budget = models.IntegerField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name