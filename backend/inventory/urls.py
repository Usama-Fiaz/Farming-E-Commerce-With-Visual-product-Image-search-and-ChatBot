from django.urls import path
from . import views

from django.urls import path,include
from django.conf.urls.static import static
from django.conf import settings
from .views import Add_product_view

from .views import ImageSearchView



urlpatterns = [
	# Add new product 
	path('product-create/', views.Add_product_view.as_view(), name="add-product"),
	# image upload
	path('upload-image/', ImageSearchView.as_view(), name="upload-image"),
	
	# Category
	path('', views.CategoryapiOverview, name="category-api-overview"),
	path('Category-list/', views.CategoryList, name="Category-list"),
	path('Category-detail/<str:pk>/', views.CategoryDetail, name="Category-detail"),
	path('Category-create/', views.CategoryCreate, name="Category-create"),
	path('Category-update/<str:pk>/', views.CategoryUpdate, name="Category-update"),
	path('Category-delete/<str:pk>/', views.CategoryDelete, name="Category-delete"),

	# Product
	path('product/', views.productapiOverview, name="product-api-overview"),
	# Get all product list
	path('product-list/', views.productList, name="product-list"),
	# Get one product detail by id
	# path('product-detail/<str:pk>/', views.productDetail, name="product-detail"),

	path('product-detail/<str:pk>/', views.ProductDetail.as_view()),




	# Get Product by Category
	path('product-by-category/<str:pk>/', views.productByCategory, name="product-by-category"),
	# Get Product by vendor
	path('product-by-vendor/<str:pk>/', views.productByShopVendor, name="product-by-vendor"),
	# search product by category ,price and sort by price
	path('product-search/<str:cat>/<str:price>/<str:sort>/', views.productByMultipleield, name="product-search"),
	# search product by multiple search field input
	path("search/<str:searchproduct>/", views.product_search_multiple_field, name="search_result"), 
	
	
	# Update Product
	path('product-update/<str:pk>/', views.productUpdate, name="product-update"),
	# Delete Product
	path('product-delete/<str:pk>/', views.productDelete, name="product-delete"),

	#shop vendor order list 
	path("shopvendor-orderlist/", views.VendorOrderView.as_view(), name="vendorOrder"),
	#shop vendor  list 
	path("shopvendor-productlist/", views.VendorDashboardProductView.as_view(), name="vendorOrder"),
	# Add new product 
	path('product-create/', views.VendorDashboardAddProductView.as_view(), name="add-product"),
    
	# Get Unique color list
	path('color-list/', views.Get_unique_colors, name="color-list"),
    # Get product by color filter with category
	path('color-list-category/<str:pk>/', views.GetuniqueColors_by_category, name="color-list-product-category"),
    
    #  Get Unique product category list
	path('product-category-list/', views.Get_unique_product_category, name="product-category-list"),
    # Get product by category filter with category
	path('productcategory-list-by/<str:pk>/', views.Get_unique_list_product_by_category, name="product-category-list-product-category"),
    # Get store location
	path('store-location/', views.Get_store_location, name="store-location"),
    # Get product by store location filter with category
	path('store-location-by/<str:pk>/', views.Get_storelocationList_by_category, name="store-location-by-category"),
    

	# room visualizer
	path('room-visualizer/', views.RoomVisualizerView.as_view(), name="roomvisualizer"),


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
