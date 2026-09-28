BEGIN;

ALTER TABLE categories
ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES categories(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_categories_parent_id
ON categories(parent_id);

UPDATE categories
SET parent_id = NULL;

DELETE FROM categories;

WITH main_categories AS (
    INSERT INTO categories (name, slug, description, parent_id, is_active)
    VALUES
    ('Food & Dining', 'food-dining', 'Restaurants, cafes, bakeries, sweets, catering and food businesses.', NULL, true),
    ('Healthcare', 'healthcare', 'Hospitals, clinics, pharmacies, diagnostics and health services.', NULL, true),
    ('Automotive', 'automotive', 'Vehicle dealers, repairs, tyres, batteries and automotive services.', NULL, true),
    ('Education', 'education', 'Schools, colleges, coaching, training and educational services.', NULL, true),
    ('Shopping', 'shopping', 'Retail stores, supermarkets, fashion, electronics and local shopping.', NULL, true),
    ('Hotels & Stays', 'hotels-stays', 'Hotels, lodges, resorts, guest houses and accommodation.', NULL, true),
    ('Professional & Local Services', 'professional-local-services', 'Professional, household and everyday local services.', NULL, true),
    ('Travel & Transport', 'travel-transport', 'Travel agencies, taxis, rentals, logistics and transport services.', NULL, true),
    ('Beauty & Wellness', 'beauty-wellness', 'Salons, spas, gyms, yoga and personal wellness.', NULL, true),
    ('Home & Living', 'home-living', 'Furniture, home improvement, appliances and household services.', NULL, true),
    ('Real Estate & Construction', 'real-estate-construction', 'Property, builders, construction and real estate services.', NULL, true),
    ('Events & Entertainment', 'events-entertainment', 'Function halls, events, cinemas, photography and entertainment.', NULL, true),
    ('Financial Services', 'financial-services', 'Banks, insurance, loans, accounting and financial services.', NULL, true),
    ('Government & Public Services', 'government-public-services', 'Government offices and public services.', NULL, true),
    ('Religious & Community Places', 'religious-community', 'Temples, mosques, churches and community organisations.', NULL, true),
    ('Jobs & Employment', 'jobs-employment', 'Recruitment agencies, employment services and job-related businesses.', NULL, true),
    ('Pets & Animals', 'pets-animals', 'Pet shops, veterinary services and animal-related businesses.', NULL, true),
    ('Tours & Local Attractions', 'tours-local-attractions', 'Tour operators, attractions and visitor experiences.', NULL, true)
    RETURNING id, slug
)
SELECT 1;

INSERT INTO categories (name, slug, description, parent_id, is_active)
SELECT v.name, v.slug, v.description, m.id, true
FROM (
    VALUES
    ('Restaurants','restaurants','Restaurants and dining establishments.','food-dining'),
    ('Indian Restaurants','indian-restaurants','Indian cuisine restaurants.','food-dining'),
    ('Andhra Restaurants','andhra-restaurants','Andhra cuisine restaurants.','food-dining'),
    ('Biryani Restaurants','biryani-restaurants','Biryani and related dining.','food-dining'),
    ('Vegetarian Restaurants','vegetarian-restaurants','Vegetarian restaurants.','food-dining'),
    ('Non-Vegetarian Restaurants','non-vegetarian-restaurants','Non-vegetarian restaurants.','food-dining'),
    ('Fast Food','fast-food','Fast food and quick service restaurants.','food-dining'),
    ('Cafes','cafes','Cafes and coffee shops.','food-dining'),
    ('Bakeries','bakeries','Bakeries and baked goods.','food-dining'),
    ('Sweets & Desserts','sweets-desserts','Sweet shops and dessert businesses.','food-dining'),
    ('Ice Cream Shops','ice-cream-shops','Ice cream and frozen dessert shops.','food-dining'),
    ('Catering Services','catering-services','Catering businesses.','food-dining'),
    ('Cloud Kitchens','cloud-kitchens','Delivery-focused food businesses.','food-dining'),

    ('Hospitals','hospitals','Hospitals and medical centres.','healthcare'),
    ('Clinics','clinics','General and specialist clinics.','healthcare'),
    ('Dental Clinics','dental-clinics','Dental care clinics.','healthcare'),
    ('Eye Hospitals & Clinics','eye-care','Eye care services.','healthcare'),
    ('Diagnostic Centers','diagnostic-centers','Diagnostic and testing centres.','healthcare'),
    ('Medical Laboratories','medical-laboratories','Medical laboratory services.','healthcare'),
    ('Pharmacies','pharmacies','Medical and pharmacy stores.','healthcare'),
    ('Physiotherapy','physiotherapy','Physiotherapy and rehabilitation.','healthcare'),
    ('Skin & Hair Clinics','skin-hair-clinics','Dermatology and hair care clinics.','healthcare'),
    ('Veterinary Clinics','veterinary-clinics','Veterinary healthcare.','healthcare'),

    ('Car Dealers','car-dealers','New and used car dealers.','automotive'),
    ('Bike Dealers','bike-dealers','Motorcycle and scooter dealers.','automotive'),
    ('Car Service Centers','car-service-centers','Car repair and servicing.','automotive'),
    ('Bike Service Centers','bike-service-centers','Two-wheeler repair and servicing.','automotive'),
    ('Tyre Shops','tyre-shops','Tyre sales and services.','automotive'),
    ('Battery Shops','battery-shops','Automotive battery sales and services.','automotive'),
    ('Car Wash','car-wash','Vehicle cleaning and detailing.','automotive'),
    ('Auto Parts','auto-parts','Automotive spare parts.','automotive'),
    ('Driving Schools','driving-schools','Driving training schools.','automotive'),

    ('Schools','schools','Schools and school education.','education'),
    ('Colleges','colleges','Colleges and degree institutions.','education'),
    ('Universities','universities','Universities and higher education.','education'),
    ('Coaching Centers','coaching-centers','Academic and competitive exam coaching.','education'),
    ('Tuition Centers','tuition-centers','Private tuition and academic support.','education'),
    ('Computer Training','computer-training','Computer and IT training.','education'),
    ('Spoken English','spoken-english','English language training.','education'),
    ('Competitive Exam Coaching','competitive-exam-coaching','Government and competitive exam preparation.','education'),
    ('Vocational Training','vocational-training','Vocational and skill training.','education'),

    ('Supermarkets','supermarkets','Supermarkets and large grocery stores.','shopping'),
    ('Grocery Stores','grocery-stores','Local grocery and provision stores.','shopping'),
    ('Clothing Stores','clothing-stores','Clothing and apparel shops.','shopping'),
    ('Jewellery Stores','jewellery-stores','Jewellery retailers.','shopping'),
    ('Mobile Phone Stores','mobile-phone-stores','Mobile phones and accessories.','shopping'),
    ('Electronics Stores','electronics-stores','Consumer electronics stores.','shopping'),
    ('Furniture Stores','furniture-stores','Furniture retailers.','shopping'),
    ('Hardware Stores','hardware-stores','Hardware and building supply stores.','shopping'),
    ('Footwear Stores','footwear-stores','Shoe and footwear retailers.','shopping'),
    ('Department Stores','department-stores','General department stores.','shopping'),

    ('Hotels','hotels','Hotels and accommodation.','hotels-stays'),
    ('Resorts','resorts','Resorts and leisure stays.','hotels-stays'),
    ('Lodges','lodges','Lodges and budget accommodation.','hotels-stays'),
    ('Guest Houses','guest-houses','Guest houses and similar accommodation.','hotels-stays'),
    ('Homestays','homestays','Homestay accommodation.','hotels-stays'),
    ('Service Apartments','service-apartments','Serviced apartments.','hotels-stays'),
    ('Budget Hotels','budget-hotels','Budget accommodation.','hotels-stays'),

    ('Lawyers & Advocates','lawyers-advocates','Legal professionals and law offices.','professional-local-services'),
    ('Chartered Accountants','chartered-accountants','Chartered accounting services.','professional-local-services'),
    ('Architects','architects','Architecture services.','professional-local-services'),
    ('Interior Designers','interior-designers','Interior design services.','professional-local-services'),
    ('Photographers','photographers','Photography services.','professional-local-services'),
    ('Event Planners','event-planners','Event planning services.','professional-local-services'),
    ('Electricians','electricians','Electrical services.','professional-local-services'),
    ('Plumbers','plumbers','Plumbing services.','professional-local-services'),
    ('Carpenters','carpenters','Carpentry services.','professional-local-services'),
    ('AC Repair','ac-repair','Air conditioning repair and service.','professional-local-services'),
    ('Appliance Repair','appliance-repair','Home appliance repair.','professional-local-services'),
    ('Laundry & Dry Cleaning','laundry-dry-cleaning','Laundry and dry cleaning services.','professional-local-services'),
    ('Printing Services','printing-services','Printing and photocopy services.','professional-local-services'),

    ('Taxi Services','taxi-services','Taxi and cab services.','travel-transport'),
    ('Car Rentals','car-rentals','Vehicle rental services.','travel-transport'),
    ('Travel Agencies','travel-agencies','Travel agencies and booking services.','travel-transport'),
    ('Tour Operators','tour-operators','Tour and travel operators.','travel-transport'),
    ('Logistics Services','logistics-services','Logistics and freight services.','travel-transport'),
    ('Courier Services','courier-services','Courier and delivery services.','travel-transport'),
    ('Packers & Movers','packers-movers','Moving and relocation services.','travel-transport'),

    ('Beauty Parlours','beauty-parlours','Beauty parlours.','beauty-wellness'),
    ('Salons','salons','Hair and beauty salons.','beauty-wellness'),
    ('Barber Shops','barber-shops','Barber shops.','beauty-wellness'),
    ('Spas','spas','Spa and relaxation services.','beauty-wellness'),
    ('Gyms','gyms','Gyms and fitness centres.','beauty-wellness'),
    ('Yoga Centers','yoga-centers','Yoga and wellness centres.','beauty-wellness'),
    ('Fitness Centers','fitness-centers','Fitness and training centres.','beauty-wellness'),

    ('Furniture','furniture','Furniture stores and services.','home-living'),
    ('Home Decor','home-decor','Home decoration and furnishings.','home-living'),
    ('Home Appliances','home-appliances','Home appliance stores.','home-living'),
    ('Paint Stores','paint-stores','Paint and decorating supply stores.','home-living'),
    ('Kitchen & Bath','kitchen-bath','Kitchen and bathroom products/services.','home-living'),
    ('Pest Control','pest-control','Pest control services.','home-living'),
    ('Building Materials','building-materials','Construction and building material suppliers.','home-living'),

    ('Property Dealers','property-dealers','Real estate agents and property dealers.','real-estate-construction'),
    ('Builders & Developers','builders-developers','Builders and property developers.','real-estate-construction'),
    ('Apartments','apartments','Apartment projects and properties.','real-estate-construction'),
    ('Plots','plots','Residential and commercial plots.','real-estate-construction'),
    ('Rental Properties','rental-properties','Rental property services.','real-estate-construction'),
    ('Property Management','property-management','Property management services.','real-estate-construction'),
    ('Construction Companies','construction-companies','Construction companies and contractors.','real-estate-construction'),

    ('Marriage Halls','marriage-halls','Marriage and wedding halls.','events-entertainment'),
    ('Function Halls','function-halls','Function and event halls.','events-entertainment'),
    ('Event Venues','event-venues','Event and celebration venues.','events-entertainment'),
    ('Cinemas','cinemas','Movie theatres and cinemas.','events-entertainment'),
    ('Wedding Photography','wedding-photography','Wedding photography and videography.','events-entertainment'),
    ('DJs','djs','DJ and music services.','events-entertainment'),
    ('Decorators','decorators','Event and wedding decoration.','events-entertainment'),
    ('Party Services','party-services','Party and celebration services.','events-entertainment'),

    ('Banks','banks','Banks and banking branches.','financial-services'),
    ('ATMs','atms','ATM locations.','financial-services'),
    ('Insurance Agencies','insurance-agencies','Insurance services.','financial-services'),
    ('Loan Services','loan-services','Loan and lending services.','financial-services'),
    ('Accounting Services','accounting-services','Accounting and bookkeeping.','financial-services'),

    ('Government Offices','government-offices','Government offices and departments.','government-public-services'),
    ('Municipal Services','municipal-services','Municipal and civic services.','government-public-services'),
    ('Public Utility Services','public-utility-services','Public utility services.','government-public-services'),

    ('Temples','temples','Temples and Hindu religious places.','religious-community'),
    ('Mosques','mosques','Mosques and Islamic religious places.','religious-community'),
    ('Churches','churches','Churches and Christian religious places.','religious-community'),
    ('Community Organizations','community-organizations','Community and social organisations.','religious-community'),

    ('Recruitment Agencies','recruitment-agencies','Recruitment and staffing services.','jobs-employment'),
    ('Employment Services','employment-services','Employment assistance and services.','jobs-employment'),

    ('Pet Shops','pet-shops','Pet stores and supplies.','pets-animals'),
    ('Pet Grooming','pet-grooming','Pet grooming services.','pets-animals'),
    ('Veterinary Services','veterinary-services','Veterinary services.','pets-animals'),

    ('Tourist Attractions','tourist-attractions','Local attractions and places of interest.','tours-local-attractions'),
    ('Tour Guides','tour-guides','Local tour guides.','tours-local-attractions'),
    ('Adventure Activities','adventure-activities','Adventure and outdoor activities.','tours-local-attractions')
) AS v(name, slug, description, parent_slug)
JOIN categories m ON m.slug = v.parent_slug;

COMMIT;
