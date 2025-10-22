#!/usr/bin/env python3
"""
Data Aggregation Script
Combines data from Yad2, Madlan, and Numbeo into a single JSON file
for the Real Estate Readiness feature
"""

import json
import os
from datetime import datetime
from typing import Dict, List
import subprocess
import sys

# Import the scraper modules
sys.path.append(os.path.dirname(__file__))
from scrape_yad2 import Yad2Scraper
from scrape_madlan import MadlanScraper
from scrape_numbeo import NumbeoScraper

class DataAggregator:
    def __init__(self):
        self.yad2_scraper = Yad2Scraper()
        self.madlan_scraper = MadlanScraper()
        self.numbeo_scraper = NumbeoScraper()
        self.output_dir = "public/data"
        
    def ensure_output_dir(self):
        """Ensure the output directory exists"""
        os.makedirs(self.output_dir, exist_ok=True)
        os.makedirs("data", exist_ok=True)
    
    def collect_all_data(self) -> Dict:
        """Collect data from all sources"""
        print("=" * 60)
        print("STARTING DATA COLLECTION")
        print("=" * 60)
        
        # Collect from each source
        print("\n[1/3] Collecting Yad2 property data...")
        yad2_data = self.yad2_scraper.scrape_all_cities()
        
        print("\n[2/3] Collecting Madlan analytics...")
        madlan_data = self.madlan_scraper.scrape_all_cities()
        
        print("\n[3/3] Collecting Numbeo cost-of-living data...")
        numbeo_data = self.numbeo_scraper.scrape_all_cities()
        
        return {
            "yad2": yad2_data,
            "madlan": madlan_data,
            "numbeo": numbeo_data
        }
    
    def aggregate_city_data(self, city_name: str, raw_data: Dict) -> Dict:
        """Aggregate data for a single city from all sources"""
        
        # Find data for this city from each source
        yad2_city = next((c for c in raw_data["yad2"] if c["city"] == city_name), None)
        madlan_city = next((c for c in raw_data["madlan"] if c["city"] == city_name), None)
        numbeo_city = next((c for c in raw_data["numbeo"] if c["city"] == city_name), None)
        
        if not all([yad2_city, madlan_city, numbeo_city]):
            print(f"Warning: Missing data for {city_name}")
            return None
        
        # Combine data into unified structure
        aggregated = {
            "city": city_name,
            "last_updated": datetime.now().isoformat(),
            "data_sources": [
                {
                    "name": "Yad2",
                    "url": "https://www.yad2.co.il/realestate",
                    "type": "Property Listings"
                },
                {
                    "name": "Madlan",
                    "url": "https://www.madlan.co.il",
                    "type": "Market Analytics"
                },
                {
                    "name": "Numbeo",
                    "url": "https://www.numbeo.com/cost-of-living",
                    "type": "Cost of Living"
                }
            ],
            "property_data": {
                "avg_price_per_sqm": yad2_city["data"]["avg_price_per_sqm"],
                "avg_rent_3br": yad2_city["data"]["avg_rent_3br"],
                "listings_count": yad2_city["data"]["listings_count"],
                "price_trend": yad2_city["data"]["price_trend"],
                "source": "Yad2"
            },
            "market_analytics": {
                "market_index": madlan_city["analytics"]["market_index"],
                "price_change_1y": madlan_city["analytics"]["price_change_1y"],
                "demand_level": madlan_city["analytics"]["demand_level"],
                "supply_level": madlan_city["analytics"]["supply_level"],
                "avg_days_on_market": madlan_city["analytics"]["avg_days_on_market"],
                "neighborhood_scores": madlan_city["analytics"]["neighborhood_scores"],
                "source": "Madlan"
            },
            "cost_of_living": {
                "housing": numbeo_city["cost_of_living"]["housing"],
                "groceries": numbeo_city["cost_of_living"]["groceries"],
                "transportation": numbeo_city["cost_of_living"]["transportation"],
                "utilities": numbeo_city["cost_of_living"]["utilities"],
                "dining": numbeo_city["cost_of_living"]["dining"],
                "total_monthly": numbeo_city["cost_of_living"]["total_monthly"],
                "cost_index": numbeo_city["cost_of_living"]["cost_index"],
                "quality_of_life_index": numbeo_city["cost_of_living"]["quality_of_life_index"],
                "source": "Numbeo"
            }
        }
        
        return aggregated
    
    def generate_community_data(self, raw_data: Dict) -> Dict:
        """Generate the final community data JSON for the frontend"""
        
        cities = ["beit_shemesh", "modiin", "rehovot", "netanya", "haifa"]
        
        community_data = {
            "last_updated": datetime.now().isoformat(),
            "data_sources": [
                {
                    "name": "Yad2",
                    "url": "https://www.yad2.co.il/realestate",
                    "description": "Israel's leading real estate platform for property listings and prices"
                },
                {
                    "name": "Madlan",
                    "url": "https://www.madlan.co.il",
                    "description": "Real estate market analytics and neighborhood insights"
                },
                {
                    "name": "Numbeo",
                    "url": "https://www.numbeo.com/cost-of-living",
                    "description": "Global cost-of-living database with user-contributed data"
                }
            ],
            "cities": []
        }
        
        for city in cities:
            city_data = self.aggregate_city_data(city, raw_data)
            if city_data:
                community_data["cities"].append(city_data)
        
        return community_data
    
    def save_data(self, community_data: Dict):
        """Save aggregated data to JSON files"""
        
        # Save to public directory for frontend access
        public_file = os.path.join(self.output_dir, "community_data.json")
        with open(public_file, 'w', encoding='utf-8') as f:
            json.dump(community_data, f, ensure_ascii=False, indent=2)
        
        print(f"\n✓ Data saved to {public_file}")
        
        # Also save a backup with timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_file = f"data/community_data_backup_{timestamp}.json"
        with open(backup_file, 'w', encoding='utf-8') as f:
            json.dump(community_data, f, ensure_ascii=False, indent=2)
        
        print(f"✓ Backup saved to {backup_file}")
    
    def run(self):
        """Main execution method"""
        print("\n" + "=" * 60)
        print("REAL ESTATE DATA AGGREGATION")
        print("=" * 60)
        print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 60)
        
        # Ensure directories exist
        self.ensure_output_dir()
        
        # Collect data from all sources
        raw_data = self.collect_all_data()
        
        # Aggregate and format data
        print("\n" + "=" * 60)
        print("AGGREGATING DATA")
        print("=" * 60)
        community_data = self.generate_community_data(raw_data)
        
        # Save to files
        print("\n" + "=" * 60)
        print("SAVING DATA")
        print("=" * 60)
        self.save_data(community_data)
        
        # Summary
        print("\n" + "=" * 60)
        print("SUMMARY")
        print("=" * 60)
        print(f"✓ Successfully aggregated data for {len(community_data['cities'])} cities")
        print(f"✓ Data sources: {len(community_data['data_sources'])}")
        print(f"✓ Last updated: {community_data['last_updated']}")
        print("=" * 60)
        print("COMPLETE")
        print("=" * 60 + "\n")

def main():
    """Main entry point"""
    aggregator = DataAggregator()
    aggregator.run()

if __name__ == "__main__":
    main()

