# UI in code

* overriding method in AppDelegate.swift











# Simple running app

```swift

import UIKit
import MapKit

class ViewController: UIViewController, CLLocationManagerDelegate, MKMapViewDelegate {
    
    
    
    
    @IBOutlet var map: MKMapView!
    
    @IBOutlet var label: UILabel!
    
    var LM = CLLocationManager()
    var dist:Double = 0
    var travelled:Double = 0
    var AL:CLLocation = CLLocation(latitude: 0, longitude: 0)
    var distanceString = ""
    lazy var locations = [CLLocation]()
    
    
    @IBOutlet var startBtn: UIButton!
    
    
    
    
    /*-----------------------------------------------------------------------------------------------------------------*/
    @IBAction func start(_ sender: Any) {
        startBtn.setTitle("Running", for: [])
        travelled = 0
        LM.startUpdatingLocation()
    }
    
    
```
# LM - didUpdateLocations
```swift
    
    /*-----------------------------------------------------------------------------------------------------------------*/
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        
        let location: CLLocation = locations[0]
        let lat = location.coordinate.latitude
        let lon = location.coordinate.longitude
        let latDelta:CLLocationDegrees = 0.05
        let lonDelta:CLLocationDegrees = 0.05
        let span = MKCoordinateSpan(latitudeDelta: latDelta, longitudeDelta: lonDelta)
        
        
        let region = MKCoordinateRegion(center: map.userLocation.coordinate, span: span)
        self.map.setRegion(region, animated: true)
        
        
        
        
        
        for location in locations{
            
            if location.horizontalAccuracy < 20{
                
                if self.locations.count > 0{
                    travelled += round(location.distance(from: AL))
                }
                
                print(travelled / 1000)
                
                distanceString = String(travelled / 1000)
                self.label.text = distanceString
                self.locations.append(location)
                
            }
            
            
        }
        AL = CLLocation(latitude: lat, longitude: lon)
    }
    
    
    
    
    
    
```

## viewDidLoad
    
```swift
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        LM.delegate = self
        LM.desiredAccuracy = kCLLocationAccuracyBest
        LM.requestWhenInUseAuthorization()
        map.showsUserLocation = true
        map.mapType = MKMapType.standard
        map.delegate = self
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
 }


```




## Optional weather
```swift
 if let url = URL(string: "https://randomuser.me/api/?results=10") {
            
            
            let task = URLSession.shared.dataTask(with: url) { (data, response, error) in
                do{
                    let JSONResult = try JSONSerialization.jsonObject(with: data!, options: JSONSerialization.ReadingOptions.mutableContainers) as AnyObject
                    
                    DispatchQueue.main.sync(execute:  {
                        self.label.text = "\(((JSONResult["results"] as? NSArray)?[0] as? NSDictionary)?["gender"] as! String)"
                    })
                }
                    
                catch{
                    print("Sth went wrong")
                    
                }
                
            }
            task.resume()
        }
            
        else {
            label.text = "Couldnt find a weather for that city."
        }
```
