import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { MapPin, Star, Navigation } from "lucide-react";

interface AttractionDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  attraction: {
    name: string;
    location: string;
    score: number;
    imageUrl: string;
    category: string;
    nearbyActivities?: string[];
  } | null;
}

export function AttractionDetailDialog({
  open,
  onOpenChange,
  attraction,
}: AttractionDetailDialogProps) {
  if (!attraction) return null;

  const getBadgeColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-blue-500";
    return "bg-gray-500";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {attraction.name}
            <Badge className={`${getBadgeColor(attraction.score)} text-white`}>
              <Star className="w-3 h-3 mr-1 fill-white" />
              {attraction.score}
            </Badge>
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {attraction.category} 카테고리의 {attraction.name}에 대한 상세 정보입니다.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 메인 이미지 */}
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img
              src={attraction.imageUrl}
              alt={attraction.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 위치 정보 */}
          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-600">{attraction.location}</p>
              <p className="text-sm text-gray-500 mt-1">{attraction.category}</p>
            </div>
          </div>

          {/* 지도 영역 */}
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-white" />
              <span className="text-white">위치 정보</span>
            </div>
            <div className="relative aspect-video bg-gradient-to-br from-blue-50 to-gray-100">
              {/* 지도 스타일 배경 패턴 */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              
              {/* 중앙 마커와 정보 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center bg-white rounded-lg shadow-lg p-6 max-w-sm mx-4">
                  <div className="relative inline-block mb-3">
                    <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>
                    <MapPin className="w-16 h-16 text-blue-600 relative" />
                  </div>
                  <h4 className="mb-2 text-gray-800">{attraction.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{attraction.location}</p>
                  <div className="text-xs text-gray-500 bg-gray-50 rounded px-3 py-2">
                    실제 지도 연동이 필요한 경우<br/>
                    카카오맵 또는 네이버 지도 API를 활용하세요
                  </div>
                </div>
              </div>

              {/* 데코레이션 요소들 */}
              <div className="absolute top-4 left-4 w-3 h-3 bg-red-500 rounded-full opacity-50"></div>
              <div className="absolute top-8 right-8 w-2 h-2 bg-green-500 rounded-full opacity-50"></div>
              <div className="absolute bottom-6 left-12 w-2 h-2 bg-yellow-500 rounded-full opacity-50"></div>
              <div className="absolute bottom-10 right-16 w-3 h-3 bg-purple-500 rounded-full opacity-50"></div>
            </div>
          </div>

          {/* 주변 놀거리 */}
          {attraction.nearbyActivities && attraction.nearbyActivities.length > 0 && (
            <div>
              <h3 className="mb-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-blue-600" />
                주변 놀거리
              </h3>
              <div className="space-y-2">
                {attraction.nearbyActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{activity}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}