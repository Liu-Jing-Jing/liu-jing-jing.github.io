// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import UIKit

class SiteTableViewController: UITableViewController
{
    private var sites = [
        Site(title:"Royals Sweep Orioles to Advance to World Series", url:"http://www.baidu.com"),
        Site(title:"How Not to Be Fooled by Odds", url:"https://www.apple.com.cn"),
        Site(title:"Against Rules, Amber Vinson, Dallas Worker With Ebola, Boarded Plane", url:"https://developer.apple.com/news/")
    ]
    
    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 1
    }
    
    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return sites.count
    }
    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = UITableViewCell(style: UITableViewCellStyle.Default, reuseIdentifier: nil)
        
        if let image = (UIImage(named: "leaf.png")) {
            cell.imageView?.image = createMockFavicon(image)
        }
        
        let site = sites[indexPath.row]
        
        cell.textLabel?.text = site.title
        cell.textLabel?.font = UIFont(name: "FiraSans-SemiBold", size: 13)
        cell.textLabel?.textColor = UIColor.darkGrayColor()
        cell.indentationWidth = 20
        
        return cell
    }
    
    override func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        let cell = tableView.cellForRowAtIndexPath(indexPath)
        let site = sites[indexPath.row]

        let readerController = ReaderViewController(nibName: "ReaderViewController", bundle: nil)
        readerController.urlSpec = site.url
        presentViewController(readerController, animated: true, completion: nil)
    }
}
