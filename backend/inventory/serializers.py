from rest_framework import serializers
from .models import product,Category
from OrderManagement.models import Order, OrderItem
from account.models import ShopVendorProfile, CustomerProfile, User
from .models import RoomVisualizer


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields ='__all__'

        
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = product
        fields = '__all__'




class ProductVendorDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopVendorProfile
        fields = '__all__'
class ProductDetailSerializer(serializers.ModelSerializer):
    vendorfk = ProductVendorDetailSerializer()
    class Meta:
        model = product
        fields = '__all__'







# vendor order serializer
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
        
# vendor order item serializer
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class ProductColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = product
        fields = ['color']

class ProductCategoryProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = product
        fields = ['Product_category']


class ProductStoreLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = product
        fields = ['available_location']



class RoomVisualizerSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomVisualizer
        fields = '__all__'