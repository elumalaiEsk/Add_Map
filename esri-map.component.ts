import { 
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter,
 
} from '@angular/core';
import { loadModules } from "esri-loader";
import esri = __esri; // Esri TypeScript Types

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})
export class EsriMapComponent{
  @Output() mapLoadedEvent = new EventEmitter<boolean>();

  // The <div> where we will place the map
  @ViewChild("mapViewNode", { static: true })
  private mapViewEl!:any;

  /**
   * _zoom sets map zoom
   * _center sets map center
   * _basemap sets type of map
   * _loaded provides map loaded status
   */
  private _zoom = 10;
  private _center: Array<number> = [0.1278, 51.5074];
  private _basemap = "streets";
  private _loaded = true;
  private _view: any = null;
  
  get mapLoaded(): boolean {
    return this._loaded;
  }

  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  set center(center: Array<number>) {
    this._center = center;
  }

  get center(): Array<number> {
    return this._center;
  }

  @Input()
  set basemap(basemap: string) {
    this._basemap = 'topo';
  }

  get basemap(): string {
    return this._basemap;
  }
  
  async initializeMap() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [EsriMap, EsriMapView,ShapefileLayer] = await loadModules([
        "esri/Map",
        "esri/views/MapView",
       
      ]);
      
      
      // Configure the Map
      const mapProperties: esri.MapProperties = {
        basemap: this._basemap,
      };


      const map: esri.Map = new EsriMap(mapProperties);

      // Initialize the MapView
      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: [95,40],//USA Center Coordinate
        zoom: this._zoom,
        map: map
      };
      

      this._view = new EsriMapView(mapViewProperties);
      
    } catch (error) {
      console.log("EsriLoader: ", error);
    }

  }
  ngOnInit() {
    this.initializeMap();
  }
}
  

 

