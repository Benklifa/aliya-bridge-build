# Real Estate Data Scraping System

This directory contains the automated data collection system for the Real Estate Readiness feature on the Aliya Financial website.

## Overview

The system collects real estate and cost-of-living data from three primary sources:
- **Yad2** - Israel's leading real estate platform for property listings and prices
- **Madlan** - Real estate market analytics and neighborhood insights  
- **Numbeo** - Global cost-of-living database with user-contributed data

Data is automatically updated **weekly** via GitHub Actions and deployed to the live website.

## Architecture

### Scripts

1. **`scrape_yad2.py`** - Collects property prices, rental rates, and market trends from Yad2
   - Average price per square meter
   - Average 3BR rental prices
   - Active listings count
   - Price trends (up/down/stable)

2. **`scrape_madlan.py`** - Collects market analytics from Madlan
   - Market strength index
   - Year-over-year price changes
   - Demand and supply levels
   - Average days on market
   - Neighborhood quality scores

3. **`scrape_numbeo.py`** - Collects cost-of-living data from Numbeo
   - Housing costs (rent and purchase)
   - Grocery expenses
   - Transportation costs
   - Utility costs
   - Dining costs
   - Quality of life indices

4. **`aggregate_data.py`** - Main orchestration script
   - Runs all scrapers sequentially
   - Combines data from all sources
   - Generates unified JSON output
   - Creates timestamped backups

### Data Flow

```
Yad2 API/Web     ──┐
Madlan API/Web   ──┤──> aggregate_data.py ──> public/data/community_data.json ──> Frontend
Numbeo API/Web   ──┘                      └──> data/backup_*.json
```

## Target Cities

The system collects data for 5 Israeli cities popular with Olim:
- **Beit Shemesh** (בית שמש)
- **Modi'in** (מודיעין)
- **Rehovot** (רחובות)
- **Netanya** (נתניה)
- **Haifa** (חיפה)

## Automated Updates

### GitHub Actions Workflow

The system uses GitHub Actions to automatically update data weekly:

- **Schedule**: Every Monday at 2 AM UTC (5 AM Israel time)
- **Workflow File**: `.github/workflows/update-real-estate-data.yml`
- **Process**:
  1. Checkout repository
  2. Set up Python environment
  3. Install dependencies (requests, beautifulsoup4)
  4. Run aggregation script
  5. Commit changes if data updated
  6. Push to repository (triggers Vercel deployment)

### Manual Trigger

You can manually trigger a data update:
1. Go to GitHub Actions tab
2. Select "Update Real Estate Data" workflow
3. Click "Run workflow"

## Running Locally

### Prerequisites

```bash
python3 -m pip install requests beautifulsoup4
```

### Run Individual Scrapers

```bash
# Yad2 data
python3 scripts/data-scrapers/scrape_yad2.py

# Madlan analytics
python3 scripts/data-scrapers/scrape_madlan.py

# Numbeo cost-of-living
python3 scripts/data-scrapers/scrape_numbeo.py
```

### Run Full Aggregation

```bash
cd /path/to/aliya-bridge-build
python3 scripts/data-scrapers/aggregate_data.py
```

This will:
- Collect data from all sources
- Generate `public/data/community_data.json`
- Create backup in `data/community_data_backup_TIMESTAMP.json`

## Output Format

### community_data.json Structure

```json
{
  "last_updated": "2025-10-22T08:12:57.964951",
  "data_sources": [
    {
      "name": "Yad2",
      "url": "https://www.yad2.co.il/realestate",
      "description": "Israel's leading real estate platform..."
    },
    ...
  ],
  "cities": [
    {
      "city": "beit_shemesh",
      "last_updated": "2025-10-22T08:12:57.965033",
      "data_sources": [...],
      "property_data": {
        "avg_price_per_sqm": 18500,
        "avg_rent_3br": 5200,
        "listings_count": 245,
        "price_trend": "stable",
        "source": "Yad2"
      },
      "market_analytics": {
        "market_index": 72.5,
        "price_change_1y": 3.2,
        "demand_level": "high",
        ...
      },
      "cost_of_living": {
        "housing": {...},
        "groceries": {...},
        "transportation": {...},
        ...
      }
    },
    ...
  ]
}
```

## Data Sources & Credibility

### Yad2 (יד2)
- **Type**: Property listings platform
- **Credibility**: Israel's largest real estate marketplace
- **Data**: Actual listing prices and rental rates
- **Update Frequency**: Real-time listings, aggregated weekly

### Madlan (מדלן)
- **Type**: Real estate analytics platform
- **Credibility**: Professional market analysis tool used by agents
- **Data**: Market indices, trends, and neighborhood scores
- **Update Frequency**: Updated regularly by platform

### Numbeo
- **Type**: Crowd-sourced cost-of-living database
- **Credibility**: World's largest database of user-contributed data
- **Data**: Cost-of-living indices from actual resident reports
- **Update Frequency**: Continuously updated by users

## Rate Limiting & Ethics

The scrapers implement responsible data collection:
- **Delay between requests**: 1-2 seconds
- **User-Agent headers**: Identifies as legitimate browser
- **Respectful crawling**: Follows robots.txt guidelines
- **Caching**: Weekly updates prevent excessive requests

## Error Handling

The system includes robust error handling:
- Failed requests are logged but don't stop execution
- Missing data for a city is logged with warnings
- Backup files preserve previous data if scraping fails
- GitHub Actions notifies on workflow failures

## Monitoring

### Check Data Freshness

The frontend displays:
- "Live Data" indicator with pulsing green dot
- "Updated weekly" label
- Last update timestamp in data sources section

### Verify Updates

1. Check GitHub Actions runs: `https://github.com/Benklifa/aliya-bridge-build/actions`
2. View commit history for automated updates
3. Inspect `public/data/community_data.json` last_updated field

## Troubleshooting

### Data Not Updating

1. Check GitHub Actions workflow status
2. Verify Python dependencies are installed
3. Check for API/website structure changes
4. Review error logs in Actions output

### Incorrect Data

1. Verify source websites haven't changed structure
2. Check scraper logic in individual scripts
3. Review aggregation logic in `aggregate_data.py`
4. Compare with manual checks on source websites

### Deployment Issues

1. Ensure Vercel is connected to GitHub
2. Verify automatic deployments are enabled
3. Check Vercel build logs for errors
4. Confirm `public/data/` directory is included in build

## Future Enhancements

Potential improvements to the system:

1. **Additional Cities**: Expand to Jerusalem, Tel Aviv, Ra'anana, etc.
2. **Neighborhood-Level Data**: Collect data for specific neighborhoods
3. **Historical Trends**: Store and display price history over time
4. **Market Alerts**: Notify of significant price changes
5. **API Integration**: Use official APIs where available
6. **Data Validation**: Cross-reference multiple sources
7. **Machine Learning**: Predict future trends from historical data

## Maintenance

### Regular Tasks

- **Monthly**: Review data accuracy against source websites
- **Quarterly**: Update scraper logic if websites change
- **Annually**: Evaluate new data sources
- **As Needed**: Add new cities or data points

### Dependencies

Keep dependencies updated:
```bash
pip install --upgrade requests beautifulsoup4
```

## Support

For issues or questions:
1. Check GitHub Actions logs
2. Review error messages in script output
3. Verify source websites are accessible
4. Contact development team if issues persist

## License

This data collection system is part of the Aliya Financial website project and follows the same license terms.

---

**Last Updated**: October 22, 2025  
**Maintained By**: Aliya Financial Development Team

